<?php

use Behat\Behat\Context\Context;
use Behat\Behat\Context\SnippetAcceptingContext;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\Tools\SchemaTool;
use PHPUnit_Framework_Assert as PHPUnit;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpKernel\KernelInterface;

/**
 * Defines application features from the specific context.
 */
class FeatureContext implements Context, SnippetAcceptingContext
{
    /**
     * @var ManagerRegistry
     */
    private $doctrine;

    /**
     * @var \Doctrine\Common\Persistence\ObjectManager
     */
    private $manager;

    /**
     * @var SchemaTool
     */
    private $schemaTool;

    /**
     * @var array
     */
    private $classes;

    /**
     * @var KernelInterface
     */
    private $kernel;

    /**
     * Initializes context.
     *
     * Every scenario gets its own context instance.
     * You can also pass arbitrary arguments to the
     * context constructor through behat.yml.
     * @param ManagerRegistry $doctrine
     * @param KernelInterface $kernel
     */
    public function __construct(ManagerRegistry $doctrine, KernelInterface $kernel)
    {
        $this->doctrine = $doctrine;
        $this->manager = $doctrine->getManager();
        $this->schemaTool = new SchemaTool($this->manager);
        $this->classes = $this->manager->getMetadataFactory()->getAllMetadata();

        $this->kernel = $kernel;
    }

    /**
     * @BeforeScenario @createSchema
     */
    public function createDatabase()
    {
        $this->schemaTool->createSchema($this->classes);
        $application = new Application($this->kernel);
        $application->setAutoExit(false);


        $input = new ArrayInput(array(
            'command' => 'doctrine:fixtures:load',
            '-n' => true,
            '-e' => 'test',
        ));
        $output = new BufferedOutput();
        $application->run($input, $output);

    }

    /**
     * @AfterScenario @dropSchema
     */
    public function dropDatabase()
    {
        $this->schemaTool->dropSchema($this->classes);
    }


    /**
     * Checks that the folder with id (in the context
     * @Then the git-folder associated with discipline :name should exist
     */
    public function theAssociatedDisciplineFolderShouldExist($name)
    {
        $discipline = $this->manager->getRepository('AppBundle:Discipline')->findOneByName($name);

        PHPUnit::assertTrue(is_dir($this->kernel->getRootDir().'/../var/git/'.$discipline->getId()));

    }
}
