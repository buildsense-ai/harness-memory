import importlib.util
import pathlib
import unittest

spec = importlib.util.spec_from_file_location('deployment', pathlib.Path(__file__).parents[1] / 'deploy' / 'deploy_main.py')
deployment = importlib.util.module_from_spec(spec)
spec.loader.exec_module(deployment)

class DeploymentTests(unittest.TestCase):
    def test_accepts_only_a_literal_deploy_command_and_full_sha(self):
        self.assertEqual(deployment.parse_command('deploy ' + 'a' * 40), 'a' * 40)
        for command in ['deploy main', 'deploy ' + 'a' * 40 + '; id', 'echo hi', 'deploy ' + 'A' * 40]:
            with self.assertRaises(ValueError): deployment.parse_command(command)

    def test_does_not_activate_unbuilt_or_stale_code(self):
        calls=[]
        def build(): raise RuntimeError('npm failed')
        with self.assertRaises(RuntimeError): deployment.release('a'*40,'a'*40,build,lambda: calls.append('activate'),lambda: calls.append('rollback'),lambda: True)
        self.assertEqual(calls,[])
        with self.assertRaises(ValueError): deployment.release('a'*40,'b'*40,lambda: calls.append('build'),lambda: None,lambda: None,lambda: True)
        self.assertEqual(calls,[])

    def test_restores_previous_release_when_healthcheck_fails(self):
        calls=[]
        with self.assertRaises(RuntimeError): deployment.release('a'*40,'a'*40,lambda:calls.append('build'),lambda:calls.append('activate'),lambda:calls.append('restore'),lambda:False)
        self.assertEqual(calls,['build','activate','restore'])

    def test_keeps_healthy_release(self):
        calls=[]
        deployment.release('a'*40,'a'*40,lambda:calls.append('build'),lambda:calls.append('activate'),lambda:calls.append('restore'),lambda:True)
        self.assertEqual(calls,['build','activate'])

if __name__=='__main__': unittest.main()
