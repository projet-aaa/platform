<?php

// src/AppBundle/Controller/BookController.php

namespace AppBundle\Controller;

use AppBundle\Entity\Test;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class TestController extends Controller
{
    /**
     * Returns a test and its whole tree (ie questiosn & choices)
     * @param Test $data
     * @return Test
     *
     * Note : this is not an empty function. It returns the test in the tree context, thus with all fields populated.
     */
    public function treeAction($data)
    {
        return $data;
    }
}