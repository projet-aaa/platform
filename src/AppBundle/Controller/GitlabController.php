<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Filesystem\Filesystem;
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

                    //maj des fichiers et des questionnaires
                    foreach ($json->commits as $commit){
                        foreach ($commit->added as $file){
                            dump($file);
                            $session = $em->getRepository('AppBundle:Test')->getOneByDisciplineFile($repo,$file);

                            if($session){
                                dump('mettre a jour le test associé à '.$file);
                            }
                        }
                    }


                    $response_code = 200;
                    $response_content = 'ok';
                    dump($request->getContent());

                } else { // No associated folder in var/git : the repository has been added after creation. let's clone it.
                    $this->cloneRepo($json->project->http_url, $repo->getId());
                    $response_content = 'No associated folder in var/git. The folder has been created.';
                    $response_code = 201;
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

    /**
     * Clone a distant git repository and init it in var/git folder.
     * This function is called when a git url is added after Discipline creation
     *
     * @param $repo_url string a valid git url
     * @param $id string discipline id
     */
    private function cloneRepo($repo_url, $id){
        $rootDir = $this->get('kernel')->getRootDir();
        $fs = new Filesystem();
        $path = $rootDir . '/../var/git/' . $id;
        if(!is_dir($path)) {
            $fs->mkdir($path,0775);
            $this->get('app.git.client')->create($path,$repo_url);
        }
    }

}
