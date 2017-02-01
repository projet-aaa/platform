<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 31/01/17
 * Time: 15:18
 */

namespace AppBundle\Security;

use AppBundle\Entity\Test;
use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class TestVoter extends BaseVoter
{

    /**
     * Determines if the attribute and subject are supported by this voter.
     *
     * @param string $attribute An attribute
     * @param mixed $subject The subject to secure, e.g. an object the user wants to access or any other PHP type
     *
     * @return bool True if the attribute and subject are supported, false otherwise
     */
    protected function supports($attribute, $subject)
    {
        // if the attribute isn't one we support, return false
        if (!in_array($attribute, array(self::CREATE, self::READ, self::UPDATE, self::DELETE))) {
            return false;
        }

        // only vote on Test objects inside this voter
        if (!$subject instanceof Test) {
            return false;
        }

        return true;
    }

    /**
     * Perform a single access check operation on a given attribute, subject and token.
     * It is safe to assume that $attribute and $subject already passed the "supports()" method check.
     *
     * @param string $attribute
     * @param mixed $subject
     * @param TokenInterface $token
     *
     * @return bool
     */
    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            // the user must be logged in; if not, deny access
            return false;
        }

        // you know $subject is a Test object, thanks to supports
        /** @var Test $test */
        $test = $subject;

        switch ($attribute) {
            case self::CREATE:
                return $this->canCreate($test, $user);
            case self::READ:
                return $this->canRead($test, $user);
            case self::UPDATE:
                return $this->canUpdate($test, $user);
            case self::DELETE:
                return $this->canDelete($test, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    private function canCreate(Test $test, User $user)
    {
        return ($user->getRole() !== 'ROLE_ELEVE');
    }

    private function canRead(Test $test, User $user)
    {
        return true;
    }

    private function canUpdate(Test $test, User $user)
    {
        return ($user->getRole() !== 'ROLE_ELEVE');
    }

    private function canDelete(Test $test, User $user)
    {
        return ($user->getRole() !== 'ROLE_ELEVE');
    }
}