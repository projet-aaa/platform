<?php


namespace AppBundle\Command;

use AppBundle\DataFixtures\ORM\LoadUserData;
use AppBundle\Entity\Discipline;
use AppBundle\Entity\McqAnswer;
use AppBundle\Entity\McqChoice;
use AppBundle\Entity\Question;
use AppBundle\Entity\Session;
use AppBundle\Entity\Test;
use AppBundle\Entity\User;
use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;

class InitialDataCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            // the name of the command (the part after "bin/console")
            ->setName('app:data:initial')

            // the short description shown while running "php bin/console list"
            ->setDescription('Loads initial data')

            // the full command description shown when running the command with
            // the "--help" option
            ->setHelp('This command allows you to load demo data : some tests and questions ..; already configured')
            ->addOption(
                'drop',
                null,
                InputOption::VALUE_NONE,
                'Should db be dropped before load ?'
            );
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {

        $drop = $input->getOption('drop');
        if ($drop) {
            $output->writeln('Dropping database');
            $kernel = $this->getContainer()->get('kernel');
            $application = new Application($kernel);
            $application->setAutoExit(false);

            $input_a = new ArrayInput(array(
                'command' => 'doctrine:schema:drop',
                '--force' => true
            ));
            // You can use NullOutput() if you don't need the output
            $output_a= new BufferedOutput();
            $application->run($input_a, $output_a);

            // return the output, don't use if you used NullOutput()
            $content = $output_a->fetch();
            $output->writeln($content);
            $output->writeln('Re-creating schema');
            $application = new Application($kernel);
            $application->setAutoExit(false);

            $input_a = new ArrayInput(array(
                'command' => 'doctrine:schema:create',
            ));
            // You can use NullOutput() if you don't need the output
            $output_a= new BufferedOutput();
            $application->run($input_a, $output_a);

            // return the output, don't use if you used NullOutput()
            $content = $output_a->fetch();
            $output->writeln($content);

        }

        $manager = $this->getContainer()->get('doctrine.orm.entity_manager');
        $user_array = array();
        //tests if some data are already loaded.
        if(count($manager->getRepository('AppBundle:User')->findAll()) > 0){
            $output->writeln('demo data already loaded. Aborting. Run the command with --drop options to purge database.');
            return;
        }


        //creates users from fixtures array
        foreach (LoadUserData::DEFAULT_USERS as $user_model){
            $user = new User();
            $user->setUsername($user_model['username']);
            $user->setFirstname('Prenom-'.$user_model['username']);
            $user->setLastname('Nom-'.$user_model['username']);
            $user->setPlainPassword($user_model['password']);
            $user->setRoles($user_model['roles']);
            $user->setEnabled(true);
            $user_array['user'.$user_model['username']] = $user;
            $manager->persist($user);

        }

        $manager->flush();

        $gls = new Discipline();
        $gls->setName('Genie Logiciel et Système');
        $manager->persist($gls);

        $tob = new Discipline();
        $tob->setName('Technologie Objet');
        $manager->persist($tob);

        $session1 = new Session();
        $session1->setName('Introduction aux objets');
        $session1->setDiscipline($tob);
        $session1->setType('CM');
        $manager->persist($session1);

        $t = new Test();
        $t->setTitle('Intro Objets');
        $t->setSession($session1);
        $t->setLive(true);
        $manager->persist($t);

        $q1 = new Question();
        $q1->setText('Can objects of abstract classes be instantiated ?');
        $q1->setExplication('Abstract class can\'t be instantiated');
        $q1->setTypeAnswer('unique'); //one unique true answer.
        $q1->setTest($t);
        $manager->persist($q1);

        $q1_a = new McqChoice();
        $q1_a->setQuestion($q1);
        $q1_a->setText('True');
        $q1_a->setCorrect(false);
        $manager->persist($q1_a);

        $q1_b = new McqChoice();
        $q1_b->setQuestion($q1);
        $q1_b->setText('False');
        $q1_b->setCorrect(true);
        $manager->persist($q1_b);

        $a1 = new McqAnswer();
        $a1->setMcqChoice($q1_a);
        $a1->setQuestion($q1);
        $a1->setAuthor($user_array['usersmaurel']);
        $manager->persist($a1);

        $a2 = new McqAnswer();
        $a2->setMcqChoice($q1_b);
        $a2->setQuestion($q1);
        $a2->setAuthor($user_array['uservachard']);
        $manager->persist($a2);


        //question 2
        $tt = new Test();
        $tt->setTitle('Final Objets');
        $tt->setSession($session1);
        $tt->setLive(false);
        $manager->persist($tt);

        $q2 = new Question();
        $q2->setText('Mention two forms of polymorphism');
        $q2->setTypeAnswer('text'); //one unique true answer.
        $q2->setTest($tt);
        $manager->persist($q2);

        $q3 = new Question();
        $q3->setText('Check the words containing a E');
        $q3->setTypeAnswer('multiple'); //one unique true answer.
        $q3->setTest($tt);
        $manager->persist($q3);

        $q3_a = new McqChoice();
        $q3_a->setQuestion($q3);
        $q3_a->setText('Inheritance');
        $q3_a->setCorrect(true);
        $manager->persist($q3_a);

        $q3_b = new McqChoice();
        $q3_b->setQuestion($q3);
        $q3_b->setText('Interface');
        $q3_b->setCorrect(true);
        $manager->persist($q3_b);

        $q3_c = new McqChoice();
        $q3_c->setQuestion($q3);
        $q3_c->setText('Abstract class');
        $q3_c->setCorrect(false);
        $manager->persist($q3_c);

        $q3_d = new McqChoice();
        $q3_d->setQuestion($q1);
        $q3_d->setText('Polymorphism');
        $q3_d->setCorrect(false);
        $manager->persist($q3_d);


        $manager->flush();

        $output->writeln('Demo loaded.');
    }
}