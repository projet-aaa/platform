<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class HomeController extends Controller
{


    /**
     * Returns the home html page - an empty page to be filled with ReactJs
     *
     * @Route("/", name="homepage")
     * @Security("has_role('ROLE_USER')")
     *
     * @return Response
     */
    public function indexAction()
    {
        return $this->render('AppBundle:Default:index.html.twig');
    }

}
