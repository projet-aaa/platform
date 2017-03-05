<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Session;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SessionController extends Controller
{
    /**
     * Returns some HTML to display a timeline of all elements in a session.
     *
     * @Route("/api/sessions/{id}/timeline", name="timeline")
     * @Security("has_role('ROLE_PROF')")
     *
     * @param Session $session
     * @return Response
     */
    public function timelineAction(Session $session)
    {
        $em = $this->getDoctrine();

        //we get all the displayed objects, add them to a single array and sort them with usort
        $feedbacks =$em->getRepository('AppBundle:Feedback')->findBy(array('session' => $session));
        $alerts =$em->getRepository('AppBundle:Alert')->findBy(array('session' => $session));

        $tab = array_merge($feedbacks,$alerts);
        $result = usort($tab,function($a, $b){
            if($a->getCreatedAt() < $b->getCreatedAt()){ return -1; }
            elseif($a->getCreatedAt() == $b->getCreatedAt()){ return 0; }
            else{ return 1;}
        });

        return $this->render('@App/Default/timeline.html.twig', array('events' => $tab));
    }
}
