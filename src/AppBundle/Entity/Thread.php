<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ApiResource(itemOperations={
 *     "get"={"method"="GET"},
 *     "put"={"method"="PUT"},
 *     "tree"={"route_name"="thread_tree", "normalization_context"={"groups"={"thread_cascade"}}}})
 * @ORM\Entity
 */
class Thread
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     * @Groups({"thread_cascade"})
     */
    private $id;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"thread_cascade"})
     */
    private $title;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="text", nullable=false)
     * @Groups({"thread_cascade"})
     */
    private $text;

    /**
     * @ORM\OneToMany(targetEntity="ThreadMessage", mappedBy="thread", cascade={"remove"})
     * @Groups({"thread_cascade"})
     */
    private $threadMessages;

    /**
     * @ORM\ManyToOne(targetEntity="Session", inversedBy="threads")
     * @ORM\JoinColumn(name="session_id", referencedColumnName="id")
     * @Groups({"thread_cascade"})
     */
    private $session;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="author_id", referencedColumnName="id")
     * @Groups({"thread_cascade"})
     */
    private $author;

    public function __toString()
    {
        return 'Thread '.$this->getTitle().' '.substr($this->getId(),0,5);
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
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * @param stirng $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }

    /**
     * @return ArrayCollection
     */
    public function getThreadMessages()
    {
        return $this->threadMessages;
    }

    /**
     * @param ArrayCollection $threadMessages
     */
    public function setThreadMessages($threadMessages)
    {
        $this->threadMessages = $threadMessages;
    }

    /**
     * @return Session
     */
    public function getSession()
    {
        return $this->session;
    }

    /**
     * @param Session $session
     */
    public function setSession(Session $session)
    {
        $this->session = $session;
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

}