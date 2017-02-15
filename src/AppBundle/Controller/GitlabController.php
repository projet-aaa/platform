<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class GitlabController extends Controller
{


    /**
     * Entrypoint for webhook
     * @Route("/api/gitlab", name="git_hook_entrypoint")
     *
     * @return Response
     */
    public function indexAction(Request $request)
    {

        $response = new JsonResponse(array('status' => 'valid'));

        return $response;
    }

}
