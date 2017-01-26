<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource
 * @ORM\Entity
 */
class McqAnswer
{
    /**
     * @ORM\Id
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="UUID")
     */
    private $id;

    /**
     * @ORM\OneToOne(targetEntity="McqChoice", inversedBy="mcqAnswer")
     * @ORM\JoinColumn(name="mcqchoice_id", referencedColumnName="id", unique=true)
     */
    private $mcqChoice;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     */
    private $author;

    public function __toString()
    {
        return 'McqAnswer '.$this->getId();
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
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
    }


}