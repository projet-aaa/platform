<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
/**
 * @ApiResource
 * @ORM\Entity
 */
class McqChoice
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
    private $answer;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $justification;

    /**
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $correct;

    /**
     * @ORM\OneToOne(targetEntity="McqAnswer", mappedBy="mcqChoice")
     */
    private $mcqAnswer;

    /**
     * @ORM\ManyToOne(targetEntity="Question", inversedBy="mcqChoice")
     * @ORM\JoinColumn(name="question_id", referencedColumnName="id")
     */
    private $question;


}