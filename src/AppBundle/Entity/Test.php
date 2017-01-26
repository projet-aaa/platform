<?php

namespace AppBundle\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
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
     * @ORM\Column(type="string", length=255, nullable=false)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $gitPath;

    /**
     * @ORM\OneToMany(targetEntity="Question", mappedBy="test")
     */
    private $questions;

    /**
     * @ORM\ManyToOne(targetEntity="Session", inversedBy="test")
     * @ORM\JoinColumn(name="session_id", referencedColumnName="id")
     */
    private $session;
}