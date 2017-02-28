<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * @ApiResource(attributes={
 *     "normalization_context"={"groups"={"read"}},
 *     "denormalization_context"={"groups"={"write"}},
 *     "filters"={"alert.search"}
 * })
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 */
class Alert implements \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     * @Groups({"read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="author_id", referencedColumnName="id")
     * @Groups({"read"})
     * @Gedmo\Blameable(on="create")
     */
    private $author;

    /**
     * @ORM\ManyToOne(targetEntity="Session")
     * @Groups({"read", "write"})
     */
    private $session;

    /**
     * @ORM\Column(type="datetime", nullable=false)
     * @Groups({"read"})
     */
    private $createdAt;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="text", nullable=false)
     * @Groups({"read", "write"})
     */
    private $text;

    /**
     * @Assert\Choice({"tooFast", "tooSlow", "good","page"})
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=15, nullable=false)
     * @Groups({"read", "write"})
     */
    private $alertType;

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
            'author' => $this->getAuthor(),
            'session' => $this->getSession(),
            'createdAd' => $this->createdAt,
            'text' => $this->text,
            'alertType' => $this->alertType,
        ];
    }

    /**
     * @return string
     */
    public function __toString()
    {
      return $this->getAlertType().' '.substr($this->getId(),0,5);
    }

    /**
     * @ORM\PrePersist()
     */
    public function prePersist(){
        $this->createdAt = new \DateTime('now');
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
     * @return User
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param User $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
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
     * @return string
     */
    public function getAlertType()
    {
        return $this->alertType;
    }

    /**
     * @param string $alertType
     */
    public function setAlertType($alertType)
    {
        $this->alertType = $alertType;
    }

}