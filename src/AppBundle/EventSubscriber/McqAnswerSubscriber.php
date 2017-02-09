<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 07/02/17
 * Time: 16:21
 */

namespace AppBundle\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use AppBundle\Entity\McqAnswer;
use Predis\Client;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class McqAnswerSubscriber implements EventSubscriberInterface
{

    /**
     * @var Client message queue
     */
    private $redis;

    /**
     * McqAnswerSubscriber constructor.
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
                ['createMcqAnswer', EventPriorities::POST_WRITE],
                ['readMcqAnswer', EventPriorities::POST_READ],
                ['updateMcqAnswer', EventPriorities::POST_WRITE],
                ['deleteMcqAnswer', EventPriorities::POST_WRITE]
            ]
        ];
    }


    /** Send a redis message to tell that a McqAnswer was created
     * @param GetResponseForControllerResultEvent $event
     */
    public function createMcqAnswer(GetResponseForControllerResultEvent $event)
    {
        $mcqAnswer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$mcqAnswer instanceof McqAnswer || Request::METHOD_POST !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'createMcqAnswer',
                'payload' => array('mcqAnswer' => $mcqAnswer))));
    }

    /** Send a redis message to tell that a McqAnswer was read
     * @param GetResponseForControllerResultEvent $event
     */
    public function readMcqAnswer(GetResponseForControllerResultEvent $event)
    {
        $mcqAnswer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$mcqAnswer instanceof McqAnswer || (Request::METHOD_GET !== $method)) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'readMcqAnswer',
                'payload' => array('alert' => $mcqAnswer))));
    }

    /** Send a redis message to tell that a McqAnswer was updated
     * @param GetResponseForControllerResultEvent $event
     */
    public function updateMcqAnswer(GetResponseForControllerResultEvent $event)
    {
        $mcqAnswer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$mcqAnswer instanceof McqAnswer || Request::METHOD_PUT !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'updateMcqAnswer',
                'payload' => array('alert' => $mcqAnswer))));
    }

    /** Send a redis message to tell that a McqAnswer was deleted
     * @param GetResponseForControllerResultEvent $event
     */
    public function deleteMcqAnswer(GetResponseForControllerResultEvent $event)
    {
        $mcqAnswer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$mcqAnswer instanceof McqAnswer || Request::METHOD_DELETE !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'deleteMcqAnswer',
                'payload' => array('alert' => $mcqAnswer))));
    }
}