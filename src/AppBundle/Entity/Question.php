<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * A question in a test.
 *
 * @ApiResource(attributes={"filters"={"question.search"}})
 * @ORM\Entity
 */
class Question
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var string the question text.
     *
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    private $text;

    /**
     * @var string a text displayed after the question.
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $explication;

    /**
     * @var string the type of the question among :
     *  - text a question expecting a text answer typed by the student
     *  - unique : one correct answer among several
     *  - multiple : several correct answers among several
     *
     * @Assert\NotBlank()
     * @Assert\Choice({"text", "unique", "multiple"})
     * @ORM\Column(type="string", length=16, nullable=false)
     */
    private $typeAnswer;

    /**
     * @var ArrayCollection[McqChoice] all the available choice of answer
     *
     * @ORM\OneToMany(targetEntity="McqChoice", mappedBy="question")
     */
    private $mcqChoice;

    /**
     * @var ArrayCollection[TextAnswer] All the answers to a text Question
     *
     * @ORM\OneToMany(targetEntity="TextAnswer", mappedBy="question")
     */
    private $textAnswers;

    /**
     * @var Test the owner of the question
     *
     * @Assert\NotNull()
     *
     * @ORM\ManyToOne(targetEntity="Test", inversedBy="questions")
     * @ORM\JoinColumn(name="test_id", referencedColumnName="id")
     */
    private $test;

    /**
     * @return string
     */
    public function __toString()
    {
        return 'Q '.$this->getText();
    }

    /**
     * Question constructor.
     */
    public function __construct()
    {
        $this->mcqChoice = new ArrayCollection();
        $this->textAnswers = new ArrayCollection();
    }

    /**
     * @Assert\IsTrue(message = "A question with answer type text can't have some McqChoice.")
     */
    public function isMcqChoiceQuestionTypeConsistent()
    {
        return ($this->typeAnswer == 'text' && $this->mcqChoice->count() == 0) ||
            $this->typeAnswer != 'text';
    }

    /** auto generated methods */

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * @param string $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }

    /**
     * @return string
     */
    public function getExplication()
    {
        return $this->explication;
    }

    /**
     * @param string $explication
     */
    public function setExplication($explication)
    {
        $this->explication = $explication;
    }

    /**
     * @return string
     */
    public function getTypeAnswer()
    {
        return $this->typeAnswer;
    }

    /**
     * @param string $typeAnswer
     */
    public function setTypeAnswer($typeAnswer)
    {
        $this->typeAnswer = $typeAnswer;
    }

    /**
     * @return mixed
     */
    public function getMcqChoice()
    {
        return $this->mcqChoice;
    }

    /**
     * @param mixed $mcqChoice
     */
    public function setMcqChoice($mcqChoice)
    {
        $this->mcqChoice = $mcqChoice;
    }

    /**
     * @param $mcqChoice McqChoice a mcqchoice for the question
     */
    public function addMcqChoice(McqChoice $mcqChoice){
        $this->mcqChoice[] = $mcqChoice;
    }

    /**
     * @param McqChoice $mcqChoice
     */
    public function removeMcqChoice(McqChoice $mcqChoice){
        $this->mcqChoice->removeElement($mcqChoice);
    }

    /**
     * @return string
     */
    public function getTextAnswers()
    {
        return $this->textAnswers;
    }

    /**
     * @param string $textAnswers
     */
    public function setTextAnswers($textAnswers)
    {
        $this->textAnswers = $textAnswers;
    }

    /**
     * @param TextAnswer $textAnswer
     */
    public function addTextAnswer(TextAnswer $textAnswer){
        $this->textAnswers[] = $textAnswer;
    }

    /**
     * @param TextAnswer $textAnswer
     */
    public function removeTextAnswer(TextAnswer $textAnswer){
        $this->textAnswers->removeElement($textAnswer);
    }

    /**
     * @return Test
     */
    public function getTest()
    {
        return $this->test;
    }

    /**
     * @param Test $test
     */
    public function setTest(Test $test)
    {
        $this->test = $test;
    }


}