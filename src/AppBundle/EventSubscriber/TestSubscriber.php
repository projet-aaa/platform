<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 07/02/17
 * Time: 16:21
 */

namespace AppBundle\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use AppBundle\Entity\Test;
use Predis\Client;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class TestSubscriber implements EventSubscriberInterface
{

    /**
     * @var Client message queue
     */
    private $redis;

    /**
     * TestSubscriber constructor.
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
                ['createTest', EventPriorities::POST_WRITE],
                ['readTest', EventPriorities::POST_READ],
                ['updateTest', EventPriorities::POST_WRITE],
                ['deleteTest', EventPriorities::POST_WRITE]
            ]
        ];
    }


    /** Send a redis message to tell that a Test was created
     * @param GetResponseForControllerResultEvent $event
     */
    public function createTest(GetResponseForControllerResultEvent $event)
    {
        $test = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$test instanceof Test || Request::METHOD_POST !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'createTest',
                'payload' => array('test' => $test))));
    }

    /** Send a redis message to tell that a Test was read
     * @param GetResponseForControllerResultEvent $event
     */
    public function readTest(GetResponseForControllerResultEvent $event)
    {
        $test = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$test instanceof Test || (Request::METHOD_GET !== $method)) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'readTest',
                'payload' => array('test' => $test))));
    }

    /** Send a redis message to tell that a Test was updated
     * @param GetResponseForControllerResultEvent $event
     */
    public function updateTest(GetResponseForControllerResultEvent $event)
    {
        $test = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$test instanceof Test || Request::METHOD_PUT !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'updateTest',
                'payload' => array('test' => $test))));
    }

    /** Send a redis message to tell that a Test was deleted
     * @param GetResponseForControllerResultEvent $event
     */
    public function deleteTest(GetResponseForControllerResultEvent $event)
    {
        $test = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$test instanceof Test || Request::METHOD_DELETE !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'deleteTest',
                'payload' => array('test' => $test))));
    }
}