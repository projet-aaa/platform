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
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @param \DateTime $updatedAt
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
    }

    /**
     * @return Subject
     */
    public function getSubjects()
    {
        return $this->subjects;
    }

    /**
     * @param Subject $subjects
     */
    public function setSubjects(Subject$subjects)
    {
        $this->subjects = $subjects;
    }

    /**
     * @return ArrayCollection
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
     * @return ArrayCollection
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
     * @return Discipline
     */
    public function getDiscipline()
    {
        return $this->discipline;
    }

    /**
     * @param Discipline $discipline
     */
    public function setDiscipline(Discipline $discipline)
    {
        $this->discipline = $discipline;
    }

}