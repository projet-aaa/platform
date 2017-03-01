<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Thread;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ThreadController extends Controller
{
    /**
     * Returns a Thread and its whole tree (ie thread message & users)
     * @param Thread $data
     * @return Thread
     *
     * Note : this is not an empty function. It returns the Thread in the tree context, thus with all fields populated.
     */
    public function treeAction($data)
    {
        return $data;
    }
}
