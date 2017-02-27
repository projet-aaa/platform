<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(itemOperations={
 *     "get"={"method"="GET"},
 *     "put"={"method"="PUT"},
 *     "tree"={"route_name"="test_tree", "normalization_context"={"groups"={"test_cascade"}}}})
 * @ORM\Entity(repositoryClass="AppBundle\Entity\TestRepository")
 */
class Test implements \JsonSerializable
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     * @Groups({"test_cascade"})
     */
    private $id;

    /**
     * @Assert\NotBlank()
     * @ORM\Column(type="string", length=255, nullable=false)
     * @Groups({"test_cascade"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"test_cascade"})
     */
    private $gitPath;

    /**
     * @var boolean True if the test is a test for live session (ie a test with only one question)
     *
     * @ORM\Column(type="boolean", nullable=false)
     * @Groups({"test_cascade"})
     */
    private $live;

    /**
     * @ORM\OneToMany(targetEntity="Question", mappedBy="test", cascade={"persist","remove"})
     * @Groups({"test_cascade"})
     */
    private $questions;

    /**
     * @ORM\ManyToOne(targetEntity="Session", inversedBy="tests")
     * @ORM\JoinColumn(name="session_id", referencedColumnName="id")
     * @Groups({"test_cascade"})
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
     * Specify data which should be serialized to JSON
     */
    function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'gitPath' => $this->gitPath,
            'live' => $this->live,
            'session' => $this->session->id,
            'questions' => $this->questions,
        ];
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