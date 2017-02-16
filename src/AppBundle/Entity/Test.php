<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ApiResource
 * @ORM\Entity
 */
class Test
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $gitPath;

    /**
     * @var boolean True if the test is a test for live session (ie a test with only one question)
     *
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $live;

    /**
     * @ORM\OneToMany(targetEntity="Question", mappedBy="test", cascade={"persist","remove"})
     */
    private $questions;

    /**
     * @ORM\ManyToOne(targetEntity="Session", inversedBy="tests")
     * @ORM\JoinColumn(name="session_id", referencedColumnName="id")
     */
    private $session;

    /**
     * @return string
     */
    public function __toString()
    {
        return 'Test '.$this->getTitle().' '.substr($this->getId(),0,5);
    }

    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }

    /**
     * @Assert\IsTrue(message="A live test can't have more than one question")
     * @return bool
     */
    public function isLiveConsistent(){
        return ($this->live && $this->getQuestions()->count() <=1) || !$this->live;
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
    public function getGitPath()
    {
        return $this->gitPath;
    }

    /**
     * @param string $gitPath
     */
    public function setGitPath($gitPath)
    {
        $this->gitPath = $gitPath;
    }

    /**
     * @return ArrayCollection
     */
    public function getQuestions()
    {
        return $this->questions;
    }

    /**
     * Add missions.
     *
     * @param Question $question
     */
    public function addQuestion(Question $question)
    {
        $this->questions[] = $question;
        $question->setTest($this);
    }

    /**
     * Remove a question.
     *
     * @param Question $question
     */
    public function removeQuestion(Question $question)
    {
        $this->questions->removeElement($question);
        $question->setTest(null);
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
     * @return boolean
     */
    public function getLive()
    {
        return $this->live;
    }

    /**
     * @param boolean $live
     */
    public function setLive($live)
    {
        $this->live = $live;
    }



}