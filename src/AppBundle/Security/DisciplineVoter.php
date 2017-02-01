<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 31/01/17
 * Time: 15:18
 */

namespace AppBundle\Security;

use AppBundle\Entity\Discipline;
use AppBundle\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;

class DisciplineVoter extends BaseVoter
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

        // only vote on Discipline objects inside this voter
        if (!$subject instanceof Discipline) {
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

        // you know $subject is a Discipline object, thanks to supports
        /** @var Discipline $discipline */
        $discipline = $subject;

        switch ($attribute) {
            case self::CREATE:
                return $this->canCreate($discipline, $user);
            case self::READ:
                return $this->canRead($discipline, $user);
            case self::UPDATE:
                return $this->canUpdate($discipline, $user);
            case self::DELETE:
                return $this->canDelete($discipline, $user);
        }

        throw new \LogicException('This code should not be reached!');
    }

    private function canCreate(Discipline $discipline, User $user)
    {
        return $user->getRole() === 'ROLE_ADMIN';
    }

    private function canRead(Discipline $discipline, User $user)
    {
        return true;
    }

    private function canUpdate(Discipline $discipline, User $user)
    {
        return $user->getRole() === 'ROLE_ADMIN';
    }

    private function canDelete(Discipline $discipline, User $user)
    {
        return $user->getRole() === 'ROLE_ADMIN';
    }
}