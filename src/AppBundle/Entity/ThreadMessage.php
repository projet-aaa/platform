<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use AppBundle\Service\Parsedown;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * A commentary -
 *
 * @ApiResource(attributes={
 *     "normalization_context"={"groups"={"tm-read"}},
 *     "denormalization_context"={"groups"={"tm-write"}}
 *     })
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 */
class ThreadMessage
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     * @Groups({"thread_cascade","tm-read"})
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"thread_cascade","tm-read","tm-write"})
     * @Assert\NotBlank()
     */
    private $text;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @Groups({"thread_cascade","tm-read"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * @Gedmo\Blameable(on="create")
     * @Groups({"thread_cascade","tm-read"})
     */
    private $author;

    /**
     * @ORM\ManyToOne(targetEntity="Thread", inversedBy="threadMessages")
     * @ORM\JoinColumn(name="thread_id", referencedColumnName="id")
     * @Assert\NotNull()
     * @Groups({"tm-read","tm-write"})
     */
    private $thread;

    /**
     * @ORM\ManyToMany(targetEntity="User")
     * @ORM\JoinTable(
     *     name="UpVote",
     *     joinColumns={@ORM\JoinColumn(name="commentary_id", referencedColumnName="id", nullable=false)},
     *     inverseJoinColumns={@ORM\JoinColumn(name="user_id2", referencedColumnName="id", nullable=false)}
     * )
     * @Groups({"thread_cascade","tm-read","tm-write"})
     */
    private $plusVoters;

    /**
     * @ORM\ManyToMany(targetEntity="User")
     * @ORM\JoinTable(
     *     name="DownVote",
     *     joinColumns={@ORM\JoinColumn(name="commentary_id", referencedColumnName="id", nullable=false)},
     *     inverseJoinColumns={@ORM\JoinColumn(name="user_id2", referencedColumnName="id", nullable=false)}
     * )
     * @Groups({"thread_cascade","tm-read","tm-write"})
     */
    private $downVoters;

    /**
     * @return string
     */
    public function __toString()
    {
        return 'ThreadMessage '.$this->getId().''.substr($this->getText(),0,100);
    }

    /**
     * @ORM\PrePersist()
     */
    public function prePersist(){
        $this->createdAt = new \DateTime('now');

        //md to html, only the first time.
        if(!$this->getId()){
            $parser = new Parsedown();
            $this->text= $parser->parse($this->text);
        }

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
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
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
     * @return Thread
     */
    public function getThread()
    {
        return $this->thread;
    }

    /**
     * @param Thread $thread
     */
    public function setThread(Thread $thread)
    {
        $this->thread = $thread;
    }

    /**
     * @return Collection
     */
    public function getPlusVoters()
    {
        return $this->plusVoters;
    }

    /**
     * @param Collection $plusVoters
     */
    public function setPlusVoters($plusVoters)
    {
        $this->plusVoters = $plusVoters;
    }

    /**
     * @return Collection
     */
    public function getDownVoters()
    {
        return $this->downVoters;
    }

    /**
     * @param Collection $downVoters
     */
    public function setDownVoters($downVoters)
    {
        $this->downVoters = $downVoters;
    }

}
