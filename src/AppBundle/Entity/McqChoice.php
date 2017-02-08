<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * An option to answer a multiple choice question.
 *
 * @ApiResource
 * @ORM\Entity
 */
class McqChoice
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var string A text that describes the answer in a MCQ
     *
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    private $answer;

    /**
     * @var string The option displayed text
     *
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $text;

    /**
     * @var boolean is it the correct (or one of the correct answer) ?
     *
     * @Assert\NotNull()
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $correct;

    /**
     * @var McqAnswer The list of McqAnswer that chose that answer
     *
     * @ORM\OneToMany(targetEntity="McqAnswer", mappedBy="mcqChoice")
     */
    private $mcqAnswer;

    /**
     * @var Question the question which that object is a choice of
     *
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="Question", inversedBy="mcqChoice")
     * @ORM\JoinColumn(name="question_id", referencedColumnName="id")
     */
    private $question;


    public function __toString()
    {
        return 'McqChoice '.$this->getId();
    }


    /** auto generated methods */

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getAnswer()
    {
        return $this->answer;
    }

    /**
     * @param mixed $answer
     */
    public function setAnswer($answer)
    {
        $this->answer = $answer;
    }

    /**
     * @return mixed
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * @param mixed $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }

    /**
     * @return mixed
     */
    public function getCorrect()
    {
        return $this->correct;
    }

    /**
     * @param mixed $correct
     */
    public function setCorrect($correct)
    {
        $this->correct = $correct;
    }

    /**
     * @return mixed
     */
    public function getMcqAnswer()
    {
        return $this->mcqAnswer;
    }

    /**
     * @param mixed $mcqAnswer
     */
    public function setMcqAnswer($mcqAnswer)
    {
        $this->mcqAnswer = $mcqAnswer;
    }

    /**
     * @return Question
     */
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * @param Question $question
     */
    public function setQuestion(Question $question)
    {
        $this->question = $question;
    }




}