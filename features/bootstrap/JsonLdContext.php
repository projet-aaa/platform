<?php

/*
 * This file is part of the Incipio package.
 *
 * (c) Théo FIDRY <theo.fidry@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


use AppBundle\Entity\User;
use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\PyStringNode;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\SchemaTool;
use FOS\UserBundle\Model\UserManager;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManagerInterface;
use PHPUnit_Framework_Assert as PHPUnit;
use Behatch\HttpCall\HttpCallResultPool;
use Behatch\HttpCall\Request;
use Behatch\Json\JsonInspector;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;

/**
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */
class JsonLdContext extends RestContext implements Context
{
    /**
     * @var JsonContext
     */
    protected $jsonContext;


    /** @var ManagerRegistry */
    private $doctrine;

    /** @var \Doctrine\Common\Persistence\ObjectManager */
    private $manager;

    /** @var JWTManagerInterface */
    private $jwtManager;

    /** @var UserManager */
    private $userManager;

    /** @var EncoderFactoryInterface */
    private $encoderFactory;

    /** @var JsonInspector */
    private $inspector;

    /**
     * @var \Doctrine\ORM\Mapping\ClassMetadata[]|array All class metadata registered by Doctrine.
     */
    private $metadata = [];

    /**
     * Initializes context.
     *
     * Every scenario gets its own context instance.
     * You can also pass arbitrary arguments to the
     * context constructor through behat.yml.
     *
     * @param ManagerRegistry         $doctrine
     * @param JWTManagerInterface     $jwtManager
     * @param UserManager             $userManager
     * @param EncoderFactoryInterface $encoderFactory
     */
    public function __construct(
        ManagerRegistry $doctrine,
        JWTManagerInterface $jwtManager,
        UserManager $userManager,
        EncoderFactoryInterface $encoderFactory,
        HttpCallResultPool $httpCallResultPool,
        Request $request,
        $evaluationMode = 'javascript'
    ) {
        $this->doctrine = $doctrine;
        $this->manager = $doctrine->getManager();
        $this->schemaTool = new SchemaTool($this->manager);
        $this->metadata = $this->manager->getMetadataFactory()->getAllMetadata();
        $this->jwtManager = $jwtManager;
        $this->userManager = $userManager;
        $this->encoderFactory = $encoderFactory;
        $this->inspector = new JsonInspector('javascript');
        $this->jsonContext = new JsonContext($evaluationMode, $httpCallResultPool);
        parent::__construct($request);
    }

    /**
     * Check if the response is in JSON-LD. Is considered as JSON-LD response a valid JSON with the property
     * content-type header.
     *
     * @Then the response should be in JSON-LD
     */
    public function jsonLdResponse()
    {
        $this->theHeaderShouldBeEqualTo('content-type', 'application/ld+json');
        PHPUnit::assertNotNull(
            json_decode($this->getSession()->getDriver()->getContent()),
            'Expected response content to be JSON.'
        );
    }

    /**
     * Check if the response is an hydra paginated collection.
     *
     * @Then I should get a paged collection with the context :context
     *
     * @param string $context
     */
    public function iGetAPagedCollectionWithContext($context)
    {
        // Response should be in JSON-LD
        $this->jsonLdResponse();

        $this->jsonContext->theJsonNodeShouldBeEqualTo('@context', $context);
        $this->jsonContext->theJsonNodeShouldExist('@id');
        $this->jsonContext->theJsonNodeShouldBeEqualTo('@type', 'hydra:PagedCollection');
        $this->jsonContext->theJsonNodeShouldExist('hydra:totalItems');
        $this->jsonContext->theJsonNodeShouldExist('hydra:itemsPerPage');
        $this->jsonContext->theJsonNodeShouldExist('hydra:member');
        $this->jsonContext->theJsonNodeShouldExist('hydra:search');
    }

    /**
     * Check if the response is an hydra resource page.
     *
     * @Then I should get a resource page with the context :context
     *
     * @param string $context
     */
    public function iGetAResourcePageWithContext($context)
    {
        // Response should be in JSON-LD
        $this->jsonLdResponse();

        $this->jsonContext->theJsonNodeShouldBeEqualTo('@context', $context);
    }

    /**
     * Sends a HTTP request
     *
     * @Given I send a :method request to :url
     */
    public function iSendARequestTo($method, $url, PyStringNode $body = null, $files = [])
    {
        return $this->request->send(
            $method,
            $this->locatePath($url),
            [],
            $files,
            $body !== null ? $body->getRaw() : null
        );
    }

    /**
     * Authenticate a user via a JWT token.
     *
     * @param User $user
     *
     * @Given I authenticate myself as :user
     */
    public function authenticateAs(User $user)
    {
        $client = $this->getSession()->getDriver()->getClient();
        $token = $this->jwtManager->create($user);
        $client->setServerParameter('HTTP_AUTHORIZATION', sprintf('Bearer %s', $token));


    }


    /**
     * @param string $name User username or email.
     *
     * @return User
     *
     * @Transform :user
     */
    public function castToUser($name)
    {
        $user = $this->userManager->findUserByUsernameOrEmail($name);
        PHPUnit::assertNotNull($user, sprintf('No user %s was found.', $name));

        return $user;
    }

    /**
     * @BeforeScenario @resetSession
     */
    public function resetSession()
    {
        $this->getSession()->reset();
        $client = $this->getSession()->getDriver()->getClient();
        $client->setServerParameter('HTTP_AUTHORIZATION', '');
    }


    /** Test that a parameter is null
     *
     * @Then the property :propertyName should not be null
     */
    public function thePropertyIsNotNull($propertyName)
    {
        $data = json_decode($this->getSession()->getDriver()->getContent());
        if (!empty($data)) {
            if (!isset($data->$propertyName)) {
                throw new Exception("Property '".$propertyName."' is not set!\n");
            }
        } else {
            throw new Exception("The property was not found\n");
        }
    }

    /** Test that a parameter is not null
     *
     * @Then the property :propertyName should be null
     */
    public function thePropertyIsNull($propertyName)
    {
        $data = json_decode($this->getSession()->getDriver()->getContent());
        if (!empty($data)) {
            if (isset($data->$propertyName)) {
                throw new Exception("Property '".$propertyName."' is set!\n");
            }
        } else {
            throw new Exception("The property was not found\n");
        }
    }

    /** Test the value of a parameter
     *
     * @Then the property :propertyName should be equals to :propertyValue
     */
    public function thePropertyEquals($propertyName, $propertyValue)
    {
        $data = json_decode($this->getSession()->getDriver()->getContent());
        if (!empty($data)) {
            if (!isset($data->$propertyName)) {
                throw new Exception("Property '".$propertyName."' is not set!\n");
            }
            if ($data->$propertyName !== $propertyValue) {
                throw new \Exception('Property value mismatch! (given: '.$propertyValue.', match: '.$data->$propertyName.')');
            }
        } else {
            throw new Exception("The property was not found\n");
        }
    }
}