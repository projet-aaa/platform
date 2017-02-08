<?php
/**
 * Create some demo data to populate the api
 */

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Discipline;
use AppBundle\Entity\McqAnswer;
use AppBundle\Entity\McqChoice;
use AppBundle\Entity\Question;
use AppBundle\Entity\Session;
use AppBundle\Entity\Test;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

class LoadDemoData extends AbstractFixture implements OrderedFixtureInterface
{

    const QUESTIONS = array();

    public function load(ObjectManager $manager)
    {
        //create 2 disciplines, a test and some questions and answers in Technologies objet

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
        $manager->persist($t);

        $q1 = new Question();
        $q1->setText('Can objects of abstract classes be instantiated ?');
        $q1->setExplication('Abstract class can\'t be instantiated');
        $q1->setTypeAnswer('unique'); //one unique true answer.
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
        $a1->setAuthor($this->getReference('usersmaurel'));
        $manager->persist($a1);

        $a2 = new McqAnswer();
        $a2->setMcqChoice($q1_b);
        $a2->setQuestion($q1);
        $a2->setAuthor($this->getReference('uservachard'));
        $manager->persist($a2);



        $manager->flush();
    }

    /**
     * Get the order of this fixture
     *
     * @return integer
     */
    public function getOrder()
    {
        return 2;
    }
}