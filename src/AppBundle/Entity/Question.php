<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource
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
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    private $text;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $explication;

    /**
     * @ORM\Column(type="string", length=255, nullable=false)
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
}