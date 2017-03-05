<?php
/**
 * Create some demo data to populate the api
 */

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Alert;
use AppBundle\Entity\Discipline;
use AppBundle\Entity\Feedback;
use AppBundle\Entity\McqAnswer;
use AppBundle\Entity\McqChoice;
use AppBundle\Entity\Question;
use AppBundle\Entity\Session;
use AppBundle\Entity\Test;
use AppBundle\Entity\TextAnswer;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\ORM\Id\AssignedGenerator;
use Doctrine\ORM\Mapping\ClassMetadata;

class LoadDemoData extends AbstractFixture implements OrderedFixtureInterface
{

    const QUESTIONS = array();

    public function load(ObjectManager $manager)
    {
        //override id strategy for all fixtures objects
        $managed_classes = array(Discipline::class, Session::class, Test::class, Question::class,
            McqChoice::class, TextAnswer::class, Feedback::class, Alert::class,
            McqAnswer::class);
        foreach ($managed_classes as $c) {
            $metadata = $manager->getClassMetaData($c);
            $metadata->setIdGeneratorType(ClassMetadata::GENERATOR_TYPE_NONE);
            $metadata->setIdGenerator(new AssignedGenerator());
        }


        //create 2 disciplines, a test and some questions and answers in Technologies objet

        $gls = new Discipline();
        $gls->setName('Genie Logiciel et Système');
        $gls->setId('8565d423-fd9f-11e6-aa56-0242ac110003');
        $manager->persist($gls);

        $tob = new Discipline();
        $tob->setName('Technologie Objet');
        $tob->setId('8565e13c-fd9f-11e6-aa56-0242ac110003');
        $manager->persist($tob);

        $session1 = new Session();
        $session1->setName('Introduction aux objets');
        $session1->setDiscipline($tob);
        $session1->setType('CM');
        $session1->setId('cdc1a93a-fda0-11e6-aa56-0242ac110003');
        $manager->persist($session1);

        $t = new Test();
        $t->setTitle('Intro Objets');
        $t->setSession($session1);
        $t->setLive(true);
        $t->setId('cdc1b277-fda0-11e6-aa56-0242ac110003');
        $manager->persist($t);

        $q1 = new Question();
        $q1->setText('Can objects of abstract classes be instantiated ?');
        $q1->setExplication('Abstract class can\'t be instantiated');
        $q1->setTypeAnswer('unique'); //one unique true answer.
        $q1->setTest($t);
        $q1->setId('6f30e1fc-fda3-11e6-aa56-0242ac110003');
        $manager->persist($q1);

        $q1_a = new McqChoice();
        $q1_a->setQuestion($q1);
        $q1_a->setText('True');
        $q1_a->setCorrect(false);
        $q1_a->setId('cdc1bc0a-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q1_a);

        $q1_b = new McqChoice();
        $q1_b->setQuestion($q1);
        $q1_b->setText('False');
        $q1_b->setCorrect(true);
        $q1_b->setId('zkk1bc0a-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q1_b);

        $a1 = new McqAnswer();
        $a1->setMcqChoice($q1_a);
        $a1->setQuestion($q1);
        $a1->setAuthor($this->getReference('usersmaurel'));
        $a1->setId('uui1bc0a-fda0-19e6-aa56-0242ac110003');
        $manager->persist($a1);

        $a2 = new McqAnswer();
        $a2->setMcqChoice($q1_b);
        $a2->setQuestion($q1);
        $a2->setAuthor($this->getReference('usereleve'));
        $a2->setId('azi1jo8a-fda0-19e6-aa56-0242ac110003');
        $manager->persist($a2);


        //question 2
        $tt = new Test();
        $tt->setTitle('Final Objets');
        $tt->setSession($session1);
        $tt->setLive(false);
        $tt->setId('cdc257f7-fda0-11e6-aa56-0242ac110003');
        $manager->persist($tt);

        $q2 = new Question();
        $q2->setText('Mention two forms of polymorphism');
        $q2->setTypeAnswer('text'); //one unique true answer.
        $q2->setTest($tt);
        $q2->setId('tyu987f7-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q2);

        $q2_t1 = new TextAnswer();
        $q2_t1->setText('form 1, form2');
        $q2_t1->setQuestion($q2);
        $q2_t1->setAuthor($this->getReference('usereleve'));
        $q2_t1->setId('tyt988t8-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q2_t1);

        $q2_t2 = new TextAnswer();
        $q2_t2->setText('form 1, form2');
        $q2_t2->setQuestion($q2);
        $q2_t2->setAuthor($this->getReference('userabeyet'));
        $q2_t2->setId('tyv999t9-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q2_t2);

        $q22 = new Question();
        $q22->setText('Mention 2 true firms');
        $q22->setTypeAnswer('text'); //one unique true answer.
        $q22->setTest($tt);
        $q22->setId('tex222d2-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q22);

        $q3 = new Question();
        $q3->setText('Check the words containing a E');
        $q3->setTypeAnswer('multiple'); //one unique true answer.
        $q3->setTest($tt);
        $q3->setId('aqw456d2-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q3);

        $q3_a = new McqChoice();
        $q3_a->setQuestion($q3);
        $q3_a->setText('Inheritance');
        $q3_a->setCorrect(true);
        $q3_a->setId('kht856d2-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q3_a);

        $q3_b = new McqChoice();
        $q3_b->setQuestion($q3);
        $q3_b->setText('Interface');
        $q3_b->setCorrect(true);
        $q3_b->setId('ygv876d2-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q3_b);

        $q3_c = new McqChoice();
        $q3_c->setQuestion($q3);
        $q3_c->setText('Abstract class');
        $q3_c->setCorrect(false);
        $q3_c->setId('edc813t2-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q3_c);

        $q3_d = new McqChoice();
        $q3_d->setQuestion($q1);
        $q3_d->setText('Polymorphism');
        $q3_d->setCorrect(false);
        $q3_d->setId('rth452u7-fda0-11e6-aa56-0242ac110003');
        $manager->persist($q3_d);

        $f1 = new Feedback();
        $f1->setId('rat415p0-fda0-11e6-aa56-0242ac110003');
        $f1->setAuthor($this->getReference('usersmaurel'));
        $f1->setSession($session1);
        $f1->setText('erreur sur la slide courante. Devrait etre 10 e non 100.');
        $manager->persist($f1);

        $f2 = new Feedback();
        $f2->setId('scn000f1-fda0-11e6-aa56-0242ac110003');
        $f2->setAuthor($this->getReference('userabeyet'));
        $f2->setSession($session1);
        $f2->setText('Image manquante');
        $manager->persist($f2);

        $al1 = new Alert();
        $al1->setId('ump999p0-fda0-11e6-aa56-0242ac110003');
        $al1->setAuthor($this->getReference('usersmaurel'));
        $al1->setSession($session1);
        $al1->setText("slow");
        $al1->setAlertType('tooSlow');
        $manager->persist($al1);

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