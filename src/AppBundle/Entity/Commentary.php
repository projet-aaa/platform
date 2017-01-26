<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource
 * @ORM\Entity
 */
class Commentary
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    private $comment;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     */
    private $postedAt;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="Thread", inversedBy="commentaries")
     * @ORM\JoinColumn(name="thread_id", referencedColumnName="id")
     */
    private $thread;

    /**
     * @ORM\ManyToMany(targetEntity="User")
     * @ORM\JoinTable(
     *     name="UpVote",
     *     joinColumns={@ORM\JoinColumn(name="commentary_id", referencedColumnName="id", nullable=false)},
     *     inverseJoinColumns={@ORM\JoinColumn(name="user_id2", referencedColumnName="id", nullable=false)}
     * )
     */
    private $plusVoters;

    /**
     * @ORM\ManyToMany(targetEntity="User")
     * @ORM\JoinTable(
     *     name="DownVote",
     *     joinColumns={@ORM\JoinColumn(name="commentary_id", referencedColumnName="id", nullable=false)},
     *     inverseJoinColumns={@ORM\JoinColumn(name="user_id2", referencedColumnName="id", nullable=false)}
     * )
     */
    private $downVoters;

    public function __toString()
    {
        return 'Commentary '.$this->getId().''.substr($this->getComment(),0,100);
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
    public function getComment()
    {
        return $this->comment;
    }

    /**
     * @param mixed $comment
     */
    public function setComment($comment)
    {
        $this->comment = $comment;
    }

    /**
     * @return mixed
     */
    public function getPostedAt()
    {
        return $this->postedAt;
    }

    /**
     * @param mixed $postedAt
     */
    public function setPostedAt($postedAt)
    {
        $this->postedAt = $postedAt;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }

    /**
     * @return mixed
     */
    public function getThread()
    {
        return $this->thread;
    }

    /**
     * @param mixed $thread
     */
    public function setThread($thread)
    {
        $this->thread = $thread;
    }

    /**
     * @return mixed
     */
    public function getPlusVoters()
    {
        return $this->plusVoters;
    }

    /**
     * @param mixed $plusVoters
     */
    public function setPlusVoters($plusVoters)
    {
        $this->plusVoters = $plusVoters;
    }

    /**
     * @return mixed
     */
    public function getDownVoters()
    {
        return $this->downVoters;
    }

    /**
     * @param mixed $downVoters
     */
    public function setDownVoters($downVoters)
    {
        $this->downVoters = $downVoters;
    }

}
