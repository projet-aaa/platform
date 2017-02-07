<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 06/02/17
 * Time: 16:53
 */

namespace AppBundle\Security;

use AppBundle\Entity\Discipline;
use AppBundle\Entity\McqAnswer;
use AppBundle\Entity\McqChoice;
use AppBundle\Entity\Question;
use AppBundle\Entity\Session;
use AppBundle\Entity\Subject;
use AppBundle\Entity\Test;
use AppBundle\Entity\TextAnswer;
use AppBundle\Entity\Thread;
use AppBundle\Entity\ThreadMessage;
use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class AccessListener
{
    /**
     * @var AuthorizationCheckerInterface
     */
    private $authorizationChecker;


    private static $accessesMap = [
        Request::METHOD_POST => BaseVoter::CREATE,
        Request::METHOD_GET => BaseVoter::READ,
        Request::METHOD_HEAD => BaseVoter::READ,
        Request::METHOD_PUT => BaseVoter::UPDATE,
        Request::METHOD_DELETE => BaseVoter::DELETE,
    ];

    /**
     * @param AuthorizationCheckerInterface $authorizationChecker
     */
    public function __construct(AuthorizationCheckerInterface $authorizationChecker)
    {
        $this->authorizationChecker = $authorizationChecker;
    }

    /**
     * @param GetResponseForControllerResultEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event)
    {
        $request = $event->getRequest();

        $resourceClass = $request->attributes->get('_api_resource_class');
        if ($resourceClass === null) {
            return;
        }

        $data = $request->attributes->get('data');
        if ($data === null) {
            $data = new $resourceClass();
        }

        $access = self::$accessesMap[$request->getMethod()] ?? 'none';

        if (is_array($data) || $data instanceof \Traversable) {
            foreach ($data as $item) {
                if (!$this->authorizationChecker->isGranted($access, $item)) {
                    throw new AccessDeniedException('Unauthorized operation.');
                }
            }

            return;
        }

        if ($data instanceof Discipline ||
            $data instanceof McqAnswer ||
            $data instanceof McqChoice ||
            $data instanceof Question ||
            $data instanceof Session ||
            $data instanceof Subject ||
            $data instanceof Test ||
            $data instanceof TextAnswer ||
            $data instanceof ThreadMessage ||
            $data instanceof Thread ||
            $data instanceof User){
            if (!$this->authorizationChecker->isGranted($access, $data)) {
                throw new AccessDeniedException('Unauthorized operation.');
            }
        }

    }
}