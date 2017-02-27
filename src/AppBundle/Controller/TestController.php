<?php

// src/AppBundle/Controller/BookController.php

namespace AppBundle\Controller;

use AppBundle\Entity\Test;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class TestController extends Controller
{
    /**
     * @param Test $data
     * @return Test
     *
     * @note this is not an empty function. It returns the test in the tree context, thus with all fields populated.
     */
    public function treeAction($data)
    {
        return $data;
    }
}