<?php
/**
 * Created by PhpStorm.
 * User: stoakes
 * Date: 07/02/17
 * Time: 15:57
 *
 * Entrypoints to open and close a live room
 */
namespace AppBundle\Controller;

use AppBundle\Entity\Session;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class RoomController extends Controller
{


    /**
     * POST-only route to close a room
     *
     * @Route("/api/room/open/{id}", name="api_open_room", methods={"POST"})
     * @Security("has_role('ROLE_PROF')")
     *
     * @param Session $session the session we want to open a live for. This parameter is resolved through
     * ExtraFrameworkBundle::ParamConverter. Just pass a correct session id to the route.
     * @return Response. 201 Status code if everything works | 500 if an exception occurs
     */
    public function openRoomAction(Session $session)
    {
        try{
            $redis = $this->get('app.redis.client');
            $redis->publish('general', json_encode(
                array(
                'type' => 'openRoom',
                'payload' =>
                    array(
                        'user' => $this->get('security.token_storage')->getToken()->getUser(),
                        'session' => $session,
                        )
                )
            )
            );
            $response = new Response();
            $response->setStatusCode(201);
            return $response;
        }
        catch (\Exception $e)
        {
            $response = new JsonResponse();
            $response->setStatusCode(500);
            $response->setContent($e->getMessage());
            return $response;
        }

    }

    /**
     * POST-only route to close a room
     *
     * @Route("/api/room/close/{id}", name="api_close_room", methods={"POST","GET"})
     * @Security("has_role('ROLE_PROF')")
     *
     * @param Session $session the session we want to close a room for. This parameter is resolved through
     * ExtraFrameworkBundle::ParamConverter. Just pass a correct session id to the route.
     * @return Response. 204 Status code if everything works | 500 if an exception occurs
     */
    public function closeRoomAction(Session $session)
    {
        try{
            $redis = $this->get('app.redis.client');
            $redis->publish('general', json_encode(
                    array(
                        'type' => 'closeRoom',
                        'payload' =>
                            array(
                                'user' => $this->get('security.token_storage')->getToken()->getUser(),
                                'session' => $session,
                            )
                    )
                )
            );
            $response = new Response();
            $response->setStatusCode(204);
            return $response;
        }
        catch (\Exception $e)
        {
            $response = new JsonResponse();
            $response->setStatusCode(500);
            $response->setContent($e->getMessage());
            return $response;
        }

    }

}
