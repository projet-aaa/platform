<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * A reply to a Question of type multiple or unique.
 * When a student replies to a multiple choice question, he creates a McqAnswer
 *
 * @ApiResource
 * @ORM\Entity
 */
class McqAnswer
{
    /**
     * @var string UUID of the McqAnswer
     *
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var McqChoice the chosen answer.
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="McqChoice", inversedBy="mcqAnswer")
     * @ORM\JoinColumn(name="mcqchoice_id", referencedColumnName="id", unique=true)
     */
    private $mcqChoice;

    /**
     * @var Question The related question.
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="Question")
     */
    private $question;

    /**
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="User")
     */
    private $author;

    public function __toString()
    {
        return 'McqAnswer '.$this->getId();
    }

    /**
     * @Assert\IsTrue(message = "The chosen McqChoice doesn't belong to the chosen Question")
     */
    public function isQuestionMcqChoiceConsistent()
    {
        return $this->mcqChoice->getQuestion() == $this->getQuestion();
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
     * @return User
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param User $author
     */
    public function setAuthor(User $author)
    {
        $this->author = $author;
    }

    /**
     * @return Question
     */
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * @param mixed $question
     */
    public function setQuestion(Question $question)
    {
        $this->question = $question;
    }




}