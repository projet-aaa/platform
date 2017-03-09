<?php

namespace AppBundle\Service;

use AppBundle\Entity\McqChoice;
use AppBundle\Entity\Question;
use AppBundle\Entity\Test;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Yaml\Yaml;

class YamlImporter
{

    private $em;

    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * Create tree test from a YML file
     * @param Test $test an already existing Test that will be filled with $file content
     * @param $file string path to the file to be imported
     * @return bool
     * @throws \Exception
     */
    public function createFromYmlToData(Test $test, $file){
        try{
            $read = Yaml::parse(file_get_contents($file));
            $read = $read['test'];
        }
        catch(\Exception $e){
            throw  new \Exception('Invalid Yaml format - '.$e->getMessage());
        }

        $test->setTitle($read['title']);

        $test->setLive($read['live']);
        $session = $this->em->getRepository('AppBundle:Session')->findOneById($read['session']);
        if($session === null){
            throw  new \Exception('Session with id '.$read['session'].' doesn\'t exists');
        }
        $test->setSession($session);

        $this->proceed($test, $read);

        return true;

    }

    /**
     * @param Test $test
     * @param $file
     * @return bool
     * @throws \Exception
     */
    public function updateFromYmlToData(Test $test, $file){
        try{
            $read = Yaml::parse(file_get_contents($file));
            $read = $read['test'];
        }
        catch(\Exception $e){
            throw  new \Exception('Invalid Yaml format - '.$e->getMessage());
        }
        $test->setTitle($read['title']);

        $test->setLive($read['live']);

        $session = $this->em->getRepository('AppBundle:Session')->findOneById($read['session']);
        if($session === null){
            throw  new \Exception('Session with id '.$read['session'].' doesn\'t exists');
        }
        $test->setSession($session);
        $this->proceed($test, $read);

        return true;
    }

    public function proceed(Test $test, array $read){

        foreach ($read['questions'] as $question){
            //is it a new question ?
            $question_exists = $this->em->getRepository('AppBundle:Question')->findBy(array('test' => $test, 'text' => $question['text']));


            if(count($question_exists) == 0) { // new question : let's create it
                $q = new Question();
                $q->setText($question['text']);
                $q->setExplication($question['explication']);
                $q->setTypeAnswer($question['typeAnswer']);
                $q->setTest($test);
                $this->em->persist($q);

                //creates associated mcqchoices
                if ($question['typeAnswer'] == 'unique' || $question['typeAnswer'] == 'multiple') {
                    foreach ($question['mcqChoices'] as $choice) {
                        $c = new McqChoice();
                        $c->setText($choice['text']);
                        $c->setCorrect($choice['correct']);
                        $c->setQuestion($q);
                        $this->em->persist($c);
                    }
                }
            }
            elseif( count($question_exists) == 1){ // already existing question, let's update it
                $q = $question_exists[0];
                $q->setText($question['text']);
                $q->setExplication($question['explication']);
                $q->setTypeAnswer($question['typeAnswer']);

                if ($question['typeAnswer'] == 'unique' || $question['typeAnswer'] == 'multiple') {
                    foreach ($question['mcqChoices'] as $choice) {
                        $choice_exists = $this->em->getRepository('AppBundle:McqChoice')->findBy(array('question' => $q, 'text' => $choice['text']));
                        if(count($choice_exists) == 0) {// that choice doesn't exists, let's create it
                            $c = new McqChoice();
                            $c->setText($choice['text']);
                            $c->setCorrect($choice['correct']);
                            $c->setQuestion($q);
                            $this->em->persist($c);
                        }
                        elseif(count($choice_exists) == 1){// that choices already exists, let's update it
                            $c = $choice_exists[0];
                            $c->setText($choice['text']);
                            $c->setCorrect($choice['correct']);
                            $c->setQuestion($q);
                        }
                        else{
                            //should not happen, let's ignore it.
                        }
                    }
                }

            }
            else{ // several questions are matching that text for that question, let's jump over it

            }
        }
        $this->em->flush();
    }

}