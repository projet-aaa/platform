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
    public function hookAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $json = json_decode($request->getContent());

        if ($json != null && property_exists($json, 'project') && property_exists($json->project, 'http_url')) {
            $repo = $em->getRepository('AppBundle:Discipline')->findOneByGitUrl($json->project->http_url);

            if ($repo) { //safety property. Should never be false.
                $rootdir = $this->get('kernel')->getRootDir();
                $path = $rootdir . '/../var/git/' . $repo->getId();
                if (is_dir($path)) {
                    //repo exists, let's pull latest version & update associated quiz
                    $git_client = $this->get('app.git.client');
                    $git_repo = $git_client::open($path);
                    $git_repo->pull();
                    $response_content = $git_repo->log();
                    $response_code = 200;
                    dump($response_content);

                } else {
                    $response_content = 'No associated folder in var/git';
                    $response_code = 500;
                }
            } else {
                $response_content = 'No repository linked to that URL :'.$json->project->http_url;
                $response_code = 404;
            }
        } else {
            $response_content = 'Unreadeable JSON or unknown http_url key';
            $response_code = 500;
        }

        $response = new Response($response_content);
        $response->setStatusCode($response_code);

        return $response;
    }

}
