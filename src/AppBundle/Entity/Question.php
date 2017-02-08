<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(attributes={"filters"={"question.search"}})
 * @ORM\Entity
 */
class Question
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
    private $text;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $explication;

    /**
     * @Assert\NotBlank()
     * @Assert\Choice({"text", "unique", "multiple"})
     * @ORM\Column(type="string", length=16, nullable=false)
     */
    private $typeAnswer;

    /**
     * @ORM\OneToMany(targetEntity="McqChoice", mappedBy="question")
     */
    private $mcqChoice;

    /**
     * @ORM\OneToMany(targetEntity="TextAnswer", mappedBy="question")
     */
    private $textAnswer;

    /**
     * @ORM\ManyToOne(targetEntity="Test", inversedBy="questions")
     * @ORM\JoinColumn(name="test_id", referencedColumnName="id")
     */
    private $test;

    public function __toString()
    {
        return 'Q '.$this->getText();
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
    public function getText()
    {
        return $this->text;
    }

    /**
     * @param mixed $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }

    /**
     * @return mixed
     */
    public function getExplication()
    {
        return $this->explication;
    }

    /**
     * @param mixed $explication
     */
    public function setExplication($explication)
    {
        $this->explication = $explication;
    }

    /**
     * @return mixed
     */
    public function getTypeAnswer()
    {
        return $this->typeAnswer;
    }

    /**
     * @param mixed $typeAnswer
     */
    public function setTypeAnswer($typeAnswer)
    {
        $this->typeAnswer = $typeAnswer;
    }

    /**
     * @return mixed
     */
    public function getMcqChoice()
    {
        return $this->mcqChoice;
    }

    /**
     * @param mixed $mcqChoice
     */
    public function setMcqChoice($mcqChoice)
    {
        $this->mcqChoice = $mcqChoice;
    }

    /**
     * @return mixed
     */
    public function getTextAnswer()
    {
        return $this->textAnswer;
    }

    /**
     * @param mixed $textAnswer
     */
    public function setTextAnswer($textAnswer)
    {
        $this->textAnswer = $textAnswer;
    }

    /**
     * @return mixed
     */
    public function getTest()
    {
        return $this->test;
    }

    /**
     * @param mixed $test
     */
    public function setTest($test)
    {
        $this->test = $test;
    }


}