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
class McqAnswer implements \JsonSerializable
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

    /**
     * Specify data which should be serialized to JSON
     * @link http://php.net/manual/en/jsonserializable.jsonserialize.php
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     * @since 5.4.0
     */
    function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'mcqChoice' => $this->getMcqChoice()->getId(),
            'author' => $this->getAuthor(),
        ];
    }

    /**
     * @return string
     */
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
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return McqChoice
     */
    public function getMcqChoice()
    {
        return $this->mcqChoice;
    }

    /**
     * @param McqChoice $mcqChoice
     */
    public function setMcqChoice(McqChoice $mcqChoice)
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