<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Test;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Yaml\Yaml;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;

class TestController extends Controller
{
    /**
     * Returns a test and its whole tree (ie questiosn & choices)
     * @param Test $data
     * @return Test
     *
     * Note : this is not an empty function. It returns the test in the tree context, thus with all fields populated.
     */
    public function treeAction($data)
    {
        return $data;
    }

    /**
     * @Route("/import/yaml", name="import_yaml")
     * @Security("has_role('ROLE_PROF')")
     * @param Request $request
     * @param Test $test
     * @return \Symfony\Component\HttpFoundation\RedirectResponse|\Symfony\Component\HttpFoundation\Response
     */
    public function importAction(Request $request){

        $em = $this->getDoctrine()->getManager();

        $form = $this->createFormBuilder()
            ->add('yaml', TextareaType::class)
            ->add('tests', EntityType::class,array('class' => 'AppBundle\Entity\Test'))
            ->add('proceed',ChoiceType::class, array('label' => 'Importer le résultat', 'choices' => array('True' => 1,'False' => 0), 'expanded' => true, 'multiple' => false))
            ->getForm();

        if ($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if ($form->isValid()) {
                $valide = true;
                try{
                    $parsed = Yaml::parse($form->getData()['yaml']);
                }
                catch (\Exception $e){
                   $valide = false;
                   $this->addFlash('warning',$e->getMessage());
                }

                $em->flush();
                if($valide) {
                    $this->addFlash('success', 'Yaml valide');
                    if($form->getData()['proceed']){
                        $yaml_importer = $this->get('app.importer.yaml');
                        $yaml_importer->proceed($form->getData()['tests'],$parsed['test']);
                        $this->addFlash('success','Import done');
                    }
                }
                return $this->redirect($this->generateUrl('import_yaml'));
            }
        }

        return $this->render('@App/Default/test_import.html.twig', array(
            'form' => $form->createView(),
        ));
    }
}