<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ApiResource(attributes={"filters"={"discipline.search"}})
 * @ORM\Entity
 * @UniqueEntity("name")
 */
class Discipline
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Assert\NotBlank
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $gitUrl;

    /**
     * @ORM\Column(type="string", length=511, nullable=true)
     */
    private $gitKey;

    /**
     * @ORM\OneToMany(targetEntity="Session", mappedBy="discipline")
     */
    private $sessions;

    /**
     * @var string the group allowed to see that discipline
     * @ORM\Column(type="string", length=31, nullable=true)
     */
    private $part; //group is a reserved word in sql.

    public function __toString()
    {
      return $this->getName().' '.substr($this->getId(),0,5);
    }

    public function __construct()
    {
        $this->sessions = new ArrayCollection();
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
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getGitUrl()
    {
        return $this->gitUrl;
    }

    /**
     * @param string $gitUrl
     */
    public function setGitUrl($gitUrl)
    {
        $this->gitUrl = $gitUrl;
    }

    /**
     * @return string
     */
    public function getGitKey()
    {
        return $this->gitKey;
    }

    /**
     * @param string $gitKey
     */
    public function setGitKey($gitKey)
    {
        $this->gitKey = $gitKey;
    }

    /**
     * @return ArrayCollection[Session]
     */
    public function getSessions()
    {
        return $this->sessions;
    }

    /**
     * @param ArrayCollection $sessions
     */
    public function setSessions($sessions)
    {
        $this->sessions = $sessions;
    }

    /**
     * @return mixed
     */
    public function getPart()
    {
        return $this->part;
    }

    /**
     * @param mixed $part
     */
    public function setPart($part)
    {
        $this->part = $part;
    }



}