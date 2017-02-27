<?php

// src/AppBundle/Controller/BookController.php

namespace AppBundle\Controller;

use AppBundle\Entity\Test;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class TestController extends Controller
{
    public function treeAction($data)
    {
        $em = $this->getDoctrine();
        $tree = $em->getRepository('AppBundle:Test')->getFullTree($data);
        return $tree;
    }
}