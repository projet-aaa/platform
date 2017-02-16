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
     * @ORM\OneToMany(targetEntity="McqAnswer", mappedBy="mcqChoice", cascade={"remove"})
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

    /**
     * @return string
     */
    public function __toString()
    {
        return 'McqChoice '.$this->getText().' '.substr($this->getId(),0,5);
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
     * @return boolean
     */
    public function getCorrect()
    {
        return $this->correct;
    }

    /**
     * @param boolean $correct
     */
    public function setCorrect($correct)
    {
        $this->correct = $correct;
    }

    /**
     * @return McqAnswer
     */
    public function getMcqAnswer()
    {
        return $this->mcqAnswer;
    }

    /**
     * @param McqAnswer $mcqAnswer
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