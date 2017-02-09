<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ApiResource
 * @ORM\Entity
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

    public function __toString()
    {
      return $this->getName().' '.substr($this->getId(),0,5);
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
     * @return strign
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
     * @return Session
     */
    public function getSessions()
    {
        return $this->sessions;
    }

    /**
     * @param Session $sessions
     */
    public function setSessions(Session $sessions)
    {
        $this->sessions = $sessions;
    }


}