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
use PHPUnit_Framework_Assert as PHPUnit;
use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;
use Behat\MinkExtension\Context\RawMinkContext;
use Behat\Symfony2Extension\Context\KernelAwareContext;
use Behat\Symfony2Extension\Context\KernelDictionary;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\SchemaTool;
use FOS\UserBundle\Doctrine\UserManager;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManagerInterface;
use Sanpi\Behatch\Json\Json;
use Sanpi\Behatch\Json\JsonInspector;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;

/**
 * @author Théo FIDRY <theo.fidry@gmail.com>
 */
class ApiContext extends RawMinkContext implements Context, SnippetAcceptingContext, KernelAwareContext
{
    /*
     * Hook to implement KernelAwareContext
     */
    use KernelDictionary;



    /**
     * @Then the password for user ":username" should be ":password"
     *
     * @param $username
     * @param $password
     */
    public function thePasswordForUserShouldBe($username, $password)
    {
        $user = $this->userManager->findUserByUsername($username);
        if (null === $user) {
            throw new \InvalidArgumentException(sprintf('No user with username %s can be found', $username));
        }
        $encoder = $this->encoderFactory->getEncoder($user);
        $valid = $encoder->isPasswordValid($user->getPassword(), $password, $user->getSalt());
        PHPUnit::assertTrue($valid, sprintf('The password for user %s does not match %s', $username, $password));
    }

    /**
     * Is a debug helper, should not be left used in Behat features.
     *
     * @Then print the last response
     */
    public function printTheResponse()
    {
        $json = $this->getSession()->getPage()->getContent();
        echo json_encode(json_decode($json), JSON_PRETTY_PRINT);
    }


    /**
     * @Given /^the JSON node "([^"]*)" of the objects of the JSON node "([^"]*)" should contains "([^"]*)"$/
     *
     * @param string $node
     * @param string $collection
     * @param string $arrayValue
     */
    public function theJSONNodeOfTheObjectsOfTheJSONNodeShouldContains($node, $collection, $arrayValue)
    {
        $accessor = PropertyAccess::createPropertyAccessor();
        $json = $this->getSession()->getPage()->getContent();
        $collection = $this->inspector->evaluate(new Json($json), $collection);

        foreach ($collection as $element) {
            in_array($arrayValue, $accessor->getValue($element, $node));
        }
    }
}