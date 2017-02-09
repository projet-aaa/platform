<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 07/02/17
 * Time: 16:21
 */

namespace AppBundle\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use AppBundle\Entity\Feedback;
use Predis\Client;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

final class FeedbackSubscriber implements EventSubscriberInterface
{

    /**
     * @var redis message queue
     */
    private $redis;

    /**
     * FEedbackSubscriber constructor.
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
                ['createFeedback', EventPriorities::POST_WRITE],
                ['readFeedback', EventPriorities::POST_READ],
                ['updateFeedback', EventPriorities::POST_WRITE],
                ['deleteFeedback', EventPriorities::POST_WRITE]
            ]
        ];
    }


    /** Send a redis message to tell that an Feedback was created
     * @param GetResponseForControllerResultEvent $event
     */
    public function createFeedback(GetResponseForControllerResultEvent $event)
    {
        $feedback = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$feedback instanceof Feedback || Request::METHOD_POST !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'createFeedback',
                'payload' => array('feedback' => $feedback))));
    }

    /** Send a redis message to tell that an Feedback was read
     * @param GetResponseForControllerResultEvent $event
     */
    public function readFeedback(GetResponseForControllerResultEvent $event)
    {
        $feedback = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$feedback instanceof Feedback || Request::METHOD_GET !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'readFeedback',
                'payload' => array('feedback' => $feedback))));
    }

    /** Send a redis message to tell that an Feedback was updated
     * @param GetResponseForControllerResultEvent $event
     */
    public function updateFeedback(GetResponseForControllerResultEvent $event)
    {
        $feedback = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$feedback instanceof Feedback || Request::METHOD_PUT !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'updateFeedback',
                'payload' => array('feedback' => $feedback))));
    }

    /** Send a redis message to tell that an Feedback was deleted
     * @param GetResponseForControllerResultEvent $event
     */
    public function deleteFeedback(GetResponseForControllerResultEvent $event)
    {
        $feedback = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$feedback instanceof Feedback || Request::METHOD_DELETE !== $method) {
            return;
        }

        $this->redis->publish('general', json_encode(
            array(
                'type' => 'deleteFeedback',
                'payload' => array('feedback' => $feedback))));
    }
}