<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
/**
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
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    private $answer;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $justification;

    /**
     * @Assert\NotNull()
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $correct;

    /**
     * @ORM\OneToOne(targetEntity="McqAnswer", mappedBy="mcqChoice")
     */
    private $mcqAnswer;

    /**
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
    public function getJustification()
    {
        return $this->justification;
    }

    /**
     * @param mixed $justification
     */
    public function setJustification($justification)
    {
        $this->justification = $justification;
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
     * @return mixed
     */
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * @param mixed $question
     */
    public function setQuestion($question)
    {
        $this->question = $question;
    }




}