<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Yaml\Yaml;

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

    /**
     * Returns the dev html page - a page containing several helper for devs
     *
     * @Route("/dev", name="devpage")
     * @Security("has_role('ROLE_ADMIN')")
     *
     * @return Response
     */
    public function devAction()
    {
        return $this->render('AppBundle:Default:dev.html.twig');
    }

}
