<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;


class SecurityController extends Controller
{

    /**
     *
     *
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     *
     * @Route("/login", name="login", methods={"GET","HEAD","POST"})
     */
    public function loginAction()
    {
        $securityContext = $this->get('security.authorization_checker');
        if($securityContext->isGranted('IS_AUTHENTICATED_REMEMBERED')){
            return $this->redirect($this->generateUrl('homepage'));
        }
        return $this->render('@App/Default/erreur.html.twig',
            array('message' => 'Votre compte n\'existe pas dans l\'application.')
        );
    }

    /**
     * @Route("/login_check", name="login_check", methods={"GET","HEAD","POST"})
     *
     * @return Response
     */
    public function logoutAction()
    {
        return $this->render('@App/Default/erreur.html.twig', array('message' => 'Vous etes bien déconnecté'));
    }

    /**
     * @Route("/logout", name="logout", methods={"GET","HEAD","POST"})
     * @throws \Exception
     */
    public function loginCheckAction()
    {
        throw new \Exception('erreur critique');
    }
}
