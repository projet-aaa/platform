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
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getGitUrl()
    {
        return $this->gitUrl;
    }

    /**
     * @param mixed $gitUrl
     */
    public function setGitUrl($gitUrl)
    {
        $this->gitUrl = $gitUrl;
    }

    /**
     * @return mixed
     */
    public function getGitKey()
    {
        return $this->gitKey;
    }

    /**
     * @param mixed $gitKey
     */
    public function setGitKey($gitKey)
    {
        $this->gitKey = $gitKey;
    }

    /**
     * @return mixed
     */
    public function getSessions()
    {
        return $this->sessions;
    }

    /**
     * @param mixed $sessions
     */
    public function setSessions($sessions)
    {
        $this->sessions = $sessions;
    }


}