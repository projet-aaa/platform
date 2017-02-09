<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 07/02/17
 * Time: 16:21
 */

namespace AppBundle\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use AppBundle\Entity\Alert;
use Predis\Client;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class AlertSubscriber implements EventSubscriberInterface
{

    /**
     * @var redis message queue
     */
    private $redis;

    /**
     * AlertSubscriber constructor.
     * @param Client $redis
     */
    public function __construct(Client $redis)
    {
        $this->redis = $redis;
    }


    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => [
                ['createAlert', EventPriorities::POST_WRITE],
                ['readAlert', EventPriorities::POST_READ],
                ['updateAlert', EventPriorities::POST_WRITE],
                ['deleteAlert', EventPriorities::POST_WRITE]
            ]
        ];
    }


    /** Send a redis message to tell that an Alert was created
     * @param GetResponseForControllerResultEvent $event
     */
    public function createAlert(GetResponseForControllerResultEvent $event)
    {
        $alert = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$alert instanceof Alert || Request::METHOD_POST !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'createAlert',
                'payload' => array('alert' => $alert))));
    }

    /** Send a redis message to tell that an Alert was read
     * @param GetResponseForControllerResultEvent $event
     */
    public function readAlert(GetResponseForControllerResultEvent $event)
    {
        $alert = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$alert instanceof Alert || Request::METHOD_GET !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'readAlert',
                'payload' => array('alert' => $alert))));
    }

    /** Send a redis message to tell that an Alert was updated
     * @param GetResponseForControllerResultEvent $event
     */
    public function updateAlert(GetResponseForControllerResultEvent $event)
    {
        $alert = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$alert instanceof Alert || Request::METHOD_PUT !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'updateAlert',
                'payload' => array('alert' => $alert))));
    }

    /** Send a redis message to tell that an Alert was deleted
     * @param GetResponseForControllerResultEvent $event
     */
    public function deleteAlert(GetResponseForControllerResultEvent $event)
    {
        $alert = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$alert instanceof Alert || Request::METHOD_DELETE !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'deleteAlert',
                'payload' => array('alert' => $alert))));
    }
}