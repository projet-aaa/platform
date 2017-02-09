<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ApiResource
 * @ORM\Entity
 * @UniqueEntity("name")
 */
class Session
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @var string The name of the session
     *
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    private $name;

    /**
     * @var string the type off the session
     *
     * @Assert\Choice({"CM", "TD", "TP"})
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=15, nullable=false)
     */
    private $type;

    /**
     * @var \DateTime the last time the object was updated.
     * Auto-updated with preUpdate and prePersist callback
     *
     * @Assert\NotBlank()
     * @ORM\Column(type="datetime", nullable=false)
     */
    private $updatedAt;

    /**
     * @var ArrayCollection[Subject] Documents linked to that session
     *
     * @ORM\OneToMany(targetEntity="Subject", mappedBy="session")
     */
    private $subjects;

    /**
     * @var ArrayCollection[Thread]  All the threads related to that session.
     *
     * @ORM\OneToMany(targetEntity="Thread", mappedBy="session")
     */
    private $threads;

    /**
     * @var ArrayCollection[Test] All the tests related to that session
     *
     * @ORM\OneToMany(targetEntity="Test", mappedBy="session")
     */
    private $tests;

    /**
     * @var Discipline The discipline owning sessions.
     * @Assert\NotNull()
     * @ORM\ManyToOne(targetEntity="Discipline", inversedBy="sessions")
     * @ORM\JoinColumn(name="discipline_id", referencedColumnName="id")
     */
    private $discipline;

    public function __toString()
    {
        return 'Session '.$this->getName();
    }

    public function __construct()
    {
        $this->subjects = new ArrayCollection();
        $this->tests = new ArrayCollection();
        $this->threads = new ArrayCollection();
    }

    /**
     * Specify data which should be serialized to JSON
     * @return mixed data which can be serialized by <b>json_encode</b>,
     * which is a value of any type other than a resource.
     */
    function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'type' => $this->type,
            'updatedAt' => $this->updatedAt,
        ];
    }

    /**
     * @ORM\PrePersist()
     * @ORM\PreUpdate()
     */
    public function prePersist(){
        $this->updatedAt = new \DateTime('now');
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
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param mixed $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @param mixed $updatedAt
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
    }

    /**
     * @return mixed
     */
    public function getSubjects()
    {
        return $this->subjects;
    }

    /**
     * @param mixed $subject
     */
    public function setSubjects($subjects)
    {
        $this->subjects = $subjects;
    }

    /**
     * @return mixed
     */
    public function getThreads()
    {
        return $this->threads;
    }

    /**
     * @param mixed $threads
     */
    public function setThreads($threads)
    {
        $this->threads = $threads;
    }

    /**
     * @return mixed
     */
    public function getTests()
    {
        return $this->tests;
    }

    /**
     * @param mixed $tests
     */
    public function setTests($tests)
    {
        $this->tests = $tests;
    }

    /**
     * @return mixed
     */
    public function getDiscipline()
    {
        return $this->discipline;
    }

    /**
     * @param mixed $discipline
     */
    public function setDiscipline($discipline)
    {
        $this->discipline = $discipline;
    }

}