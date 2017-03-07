<?php
/**
 * Created by PhpStorm.
 * User: vincent
 * Date: 31/01/17
 * Time: 15:59
 */

namespace AppBundle\Security;

use Symfony\Component\Security\Core\Authorization\Voter\Voter;


abstract class BaseVoter extends Voter{

    /**
     * CRUD actions for the voters
     */
    const CREATE = 'create';
    const READ = 'read';
    const UPDATE = 'update';
    const DELETE = 'delete';

    /**
     * Complete $roles with role hierarchy.
     * @param array $roles
     * @return array
     */
    protected function getRolesHierarchy(array $roles){
        //admin encompasses prof
        if(in_array('ROLE_ADMIN', $roles) && !in_array('ROLE_PROF', $roles)){
            array_push($roles,'ROLE_PROF');
        }

        //prof encompasses user.
        if(in_array('ROLE_PROF', $roles) && !in_array('ROLE_USER', $roles)){
            array_push($roles,'ROLE_USER');
        }

        return $roles;
    }

}
