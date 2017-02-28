<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ApiResource(attributes={
 *     "normalization_context"={"groups"={"read"}},
 *     "denormalization_context"={"groups"={"write"}},
 *     "filters"={"text_answer.search"}
 * })
 * @UniqueEntity(
 *     fields={"author", "question"},
 *     errorPath="question",
 *     message="This author already has an answer for that Question"
 * )
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 */
class TextAnswer
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     * @Groups({"read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"read","write"})
     */
    private $text;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * @Groups({"read"})
     * @Gedmo\Blameable(on="create")
     */
    private $author;

    /**
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="Question", inversedBy="textAnswers")
     * @ORM\JoinColumn(name="question_id", referencedColumnName="id")
     * @Groups({"read","write"})
     */
    private $question;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @Groups({"read"})
     */
    private $createdAt;

    public function __toString()
    {
        return 'Text Answer '.$this->getId();
    }

    /**
     * @ORM\PrePersist()
     */
    public function prePersist(){
        $this->createdAt = new \DateTime('now');
    }

    /**
     * @Assert\IsTrue(message="The owning question is not of type text")
     * @return bool
     */
    public function isQuestionConsistent(){
        return $this->getQuestion()->getTypeAnswer() == 'text';
    }

    /** Auto generated methods*/

    /**
     * @return string
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
     * @param Question $question
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