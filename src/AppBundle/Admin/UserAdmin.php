<?php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Form\FormMapper;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class UserAdmin extends AbstractAdmin
{
    // Fields to be shown on create/edit forms
    protected function configureFormFields(FormMapper $formMapper)
    {
        $formMapper->add('username')
        ->add('firstname')
        ->add('lastname')
        ->add('password')
        ->add('roles',ChoiceType::class,array(
            'choices' => array('Admin' => 'ROLE_ADMIN','Prof' => 'ROLE_PROF', 'Eleve' => 'ROLE_USER'),
            'multiple' => true,
        ))
        ->add('part',TextType::class,array('label' => 'Groupe Eleve', 'required' => false))
        ->add('email');
    }

    // Fields on which entities can be filtered.
    protected function configureDatagridFilters(DatagridMapper $datagridMapper)
    {
        $datagridMapper->add('username')
        ->add('lastname')
        ->add('roles');
    }

    // Fields that will be displayed in list view
    protected function configureListFields(ListMapper $listMapper)
    {
        $listMapper->add('id')
            ->addIdentifier('username')
            ->add('firstname')
            ->add('lastname')
            ->add('roles');
    }
}
