<?php
namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use \Predis\Client;

class DefaultController extends Controller
{


	/**
     * @Route("/socket/{name}")
	 */
    public function indexAction(Request $request, $name = 'default')
    {

			$redis = new Client('tcp://redis:6379');
            $value = $redis->publish('updates', $name.''.rand(1,100));

 

        return $this->render('AppBundle:Default:index.html.twig', array(
           
        ));
    }

}
