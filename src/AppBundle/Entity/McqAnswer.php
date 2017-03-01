<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use AppBundle\Service as Assert2;

/**
 * A reply to a Question of type multiple or unique.
 * When a student replies to a multiple choice question, he creates a McqAnswer
 *
 * @ApiResource(attributes={
 *     "normalization_context"={"groups"={"read"}},
 *     "denormalization_context"={"groups"={"write"}},
 *     "filters"={"mcq_answer.search"}
 * })
 * @UniqueEntity(
 *     fields={"author", "mcqChoice"},
 *     errorPath="mcqChoice",
 *     message="This author already has already answered that Choice"
 * )
 * @Assert2\McqAnswerConsistent()
 * @ORM\Entity(repositoryClass="AppBundle\Entity\McqAnswerRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class McqAnswer implements \JsonSerializable
{
    /**
     * @var string UUID of the McqAnswer
     *
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     * @Groups({"read"})
     */
    private $id;

    /**
     * @var McqChoice the chosen answer.
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="McqChoice", inversedBy="mcqAnswer")
     * @ORM\JoinColumn(name="mcqchoice_id", referencedColumnName="id")
     * @Groups({"read", "write"})
     */
    private $mcqChoice;

    /**
     * @var Question The related question.
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="Question")
     * @Groups({"read","write"})
     */
    private $question;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @Groups({"read"})
     * @Gedmo\Blameable(on="create")
     * @ORM\JoinColumn(name="author_id", referencedColumnName="id")
     */
    private $author;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @Groups({"read"})
     */
    private $createdAt;

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
            'question' => $this->getQuestion()->getId(),
            'author' => $this->getAuthor(),
            'createdAt' => $this->getCreatedAt()
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

    /**
     * @Assert\IsTrue(message = "You can't have multiple McqAnswer for a non 'multiple' question.")
     */
    public function isNumberMcqChoiceConsistent()
    {
        return $this->mcqChoice->getQuestion() == $this->getQuestion();
    }

    /**
     * @ORM\PrePersist()
     */
    public function prePersist(){
        $this->createdAt = new \DateTime('now');
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
     * @param string $id
     */
    public function setId($id)
    {
        $this->id = $id;
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

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param mixed $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }


}